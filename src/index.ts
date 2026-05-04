import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { initSchema } from "./db/database.js";
import { getMedicalConcept, listCategories, listConcepts } from "./tools/get_medical_concept.js";
import { getDrugInfo, listDrugClasses } from "./tools/get_drug_info.js";
import { getDrugInteractions } from "./tools/get_drug_interactions.js";
import { getICD11Code } from "./tools/get_icd11_code.js";
import { getDifferentialDiagnosis } from "./tools/get_differential_diagnosis.js";
import { getLabValue, listLabCategories } from "./tools/get_lab_value.js";

initSchema();

const server = new Server(
  { name: "medmcp", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_medical_concept",
      description:
        "Retrieve a structured medical concept (physiology, anatomy, pharmacology, immunology). Returns mechanism of action, clinical relevance, and related concepts. Use list_categories or list_concepts first to discover what's available.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "Concept name or keyword to search (e.g. 'action potential', 'blood-brain barrier', 'RAAS')",
          },
          category: {
            type: "string",
            description:
              "Optional filter by category: 'physiology', 'anatomy', 'pharmacology', 'immunology'",
          },
          exact: {
            type: "boolean",
            description: "If true, only match exact name (default: false — fuzzy search)",
          },
          action: {
            type: "string",
            enum: ["get", "list_categories", "list_concepts"],
            description:
              "Action to perform: 'get' (default) fetches a concept; 'list_categories' lists all categories; 'list_concepts' lists all concepts (filterable by category)",
          },
        },
        required: [],
      },
    },
    {
      name: "get_drug_info",
      description:
        "Retrieve structured drug information: mechanism of action, indications, contraindications, dosing, side effects, and monitoring parameters. Searches by brand name, generic name, or drug class.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "Drug name (brand or generic), e.g. 'metformin', 'atorvastatin', 'Lasix'. Also searches by drug class (e.g. 'statin', 'ACE inhibitor').",
          },
          exact: {
            type: "boolean",
            description: "If true, only exact name match (default: false)",
          },
          action: {
            type: "string",
            enum: ["get", "list_classes"],
            description:
              "'get' retrieves a drug; 'list_classes' returns all drug classes in the database",
          },
        },
        required: [],
      },
    },
    {
      name: "get_drug_interactions",
      description:
        "Check interactions between two or more drugs. Returns severity (mild/moderate/severe/contraindicated), pharmacological mechanism, clinical effect, and management recommendations for each drug pair.",
      inputSchema: {
        type: "object",
        properties: {
          drugs: {
            type: "array",
            items: { type: "string" },
            minItems: 2,
            description:
              "List of drug names to check interactions between (e.g. ['warfarin', 'aspirin', 'omeprazole']). All pairs are checked.",
          },
        },
        required: ["drugs"],
      },
    },
    {
      name: "get_icd11_code",
      description:
        "Look up ICD-11 diagnostic codes and their structured descriptions. Search by code (e.g. '5A11') or by condition name/keyword. Returns inclusion/exclusion terms and full clinical description.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "ICD-11 code (e.g. '5A11') or condition name/keyword (e.g. 'diabetes', 'atrial fibrillation', 'pneumonia')",
          },
          search_by: {
            type: "string",
            enum: ["code", "title", "any"],
            description:
              "'code' for exact code lookup; 'title' for title search; 'any' (default) tries code first, then full-text",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_differential_diagnosis",
      description:
        "Generate a ranked differential diagnosis list based on a set of symptoms. Returns matching diagnoses with distinguishing features, key investigations, and ICD-11 codes, ranked by symptom overlap score.",
      inputSchema: {
        type: "object",
        properties: {
          symptoms: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            description:
              "List of symptoms to match against (e.g. ['dyspnoea', 'pleuritic chest pain', 'haemoptysis', 'tachycardia']). More symptoms = better ranked results.",
          },
          max_results: {
            type: "number",
            description: "Maximum number of differential diagnoses to return (default: 5)",
          },
        },
        required: ["symptoms"],
      },
    },
    {
      name: "get_lab_value",
      description:
        "Look up reference ranges, critical values, and clinical interpretation for common laboratory tests. Covers electrolytes (Na, K, Cl), renal function (urea, creatinine), metabolic (glucose), cardiac (troponin), inflammatory (CRP), and haematology (haemoglobin, WBC). Use action='list' to see all available lab tests.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "Lab test name or abbreviation (e.g. 'sodium', 'Na+', 'troponin', 'Hb', 'CRP', 'creatinine')",
          },
          category: {
            type: "string",
            description:
              "Filter by category when listing: 'electrolytes', 'renal', 'metabolic', 'cardiac', 'inflammatory', 'haematology'",
          },
          action: {
            type: "string",
            enum: ["get", "list"],
            description:
              "'get' (default) looks up a specific lab test; 'list' returns all available tests (filterable by category)",
          },
        },
        required: [],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "get_medical_concept": {
        const action = (args?.action as string | undefined) ?? "get";
        if (action === "list_categories") {
          return ok({ categories: listCategories() });
        }
        if (action === "list_concepts") {
          return ok({ concepts: listConcepts(args?.category as string | undefined) });
        }
        if (!args?.name) {
          return ok({
            hint: "Provide a 'name' to search, or use action='list_categories' / action='list_concepts' to browse.",
          });
        }
        const result = getMedicalConcept({
          name: args.name as string,
          category: args.category as string | undefined,
          exact: args.exact as boolean | undefined,
        });
        return ok(result);
      }

      case "get_drug_info": {
        const action = (args?.action as string | undefined) ?? "get";
        if (action === "list_classes") {
          return ok({ drug_classes: listDrugClasses() });
        }
        if (!args?.name) {
          return ok({
            hint: "Provide a 'name' to search, or use action='list_classes' to browse drug classes.",
          });
        }
        return ok(
          getDrugInfo({
            name: args.name as string,
            exact: args.exact as boolean | undefined,
          })
        );
      }

      case "get_drug_interactions": {
        if (!args?.drugs || !Array.isArray(args.drugs) || args.drugs.length < 2) {
          return err("Provide at least 2 drug names in the 'drugs' array.");
        }
        return ok(getDrugInteractions({ drugs: args.drugs as string[] }));
      }

      case "get_icd11_code": {
        if (!args?.query) return err("Provide a 'query' (ICD-11 code or condition name).");
        return ok(
          getICD11Code({
            query: args.query as string,
            search_by: args.search_by as "code" | "title" | "any" | undefined,
          })
        );
      }

      case "get_differential_diagnosis": {
        if (!args?.symptoms || !Array.isArray(args.symptoms) || args.symptoms.length === 0) {
          return err("Provide at least one symptom in the 'symptoms' array.");
        }
        return ok(
          getDifferentialDiagnosis({
            symptoms: args.symptoms as string[],
            max_results: args.max_results as number | undefined,
          })
        );
      }

      case "get_lab_value": {
        const action = (args?.action as "get" | "list" | undefined) ?? "get";
        if (action === "list") {
          return ok(getLabValue({ action: "list", category: args?.category as string | undefined }));
        }
        if (!args?.name) {
          return ok({
            categories: listLabCategories(),
            hint: "Provide a 'name' to look up a specific lab value, or use action='list' to browse all.",
          });
        }
        return ok(getLabValue({ name: args.name as string, action: "get" }));
      }

      default:
        return err(`Unknown tool: ${name}`);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return err(`Internal error: ${message}`);
  }
});

function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function err(message: string) {
  return {
    content: [{ type: "text" as const, text: message }],
    isError: true,
  };
}

const transport = new StdioServerTransport();
await server.connect(transport);
