export interface PropertyData {
  lease: {
    tenant: {
      name: string;
      creditRating: string;
      industry: string;
      occupancyType: string;
    };
    terms: {
      startDate: string;
      expiryDate: string;
      term: string;
      type: string;
    };
    rent: {
      baseRentPSF: number;
      annualRent: number;
      escalations: {
        type: string;
        rate: number;
        frequency: string;
      };
      annualEscalations: Array<{
        year: number;
        amount: number;
      }>;
    };
    recoveryTerms: {
      cam: string;
      insurance: string;
      taxes: string;
      utilities: string;
    };
    renewalOptions: Array<{
      term: string;
      type: string;
      notice: string;
      escalation?: number;
    }>;
  };
}

export const mockPropertyData: PropertyData = {
  lease: {
    tenant: {
      name: "ABC Logistics Corp",
      creditRating: "BBB+",
      industry: "Logistics & Distribution",
      occupancyType: "Single Tenant"
    },
    terms: {
      startDate: "2023-01-01",
      expiryDate: "2028-12-31",
      term: "5 years",
      type: "Triple Net (NNN)"
    },
    rent: {
      baseRentPSF: 45.50,
      annualRent: 85449,
      escalations: {
        type: "Fixed",
        rate: 3.0,
        frequency: "Annual"
      },
      annualEscalations: [
        { year: 2023, amount: 45.50 },
        { year: 2024, amount: 46.87 },
        { year: 2025, amount: 48.27 },
        { year: 2026, amount: 49.72 },
        { year: 2027, amount: 51.21 }
      ]
    },
    recoveryTerms: {
      cam: "Tenant pays all Common Area Maintenance",
      insurance: "Tenant responsible for building insurance",
      taxes: "Tenant responsible for real estate taxes",
      utilities: "Tenant pays all utilities directly"
    },
    renewalOptions: [
      {
        term: "4 years",
        type: "Market Rate",
        notice: "12 months",
        escalation: 4.0
      },
      {
        term: "5 years",
        type: "Market Rate",
        notice: "12 months",
        escalation: 3.0
      }
    ]
  }
};
