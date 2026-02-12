export type FlowiseCredential = {
  id: string;
  name: string;
  credentialName?: string;
  createdDate?: string;
};

export type FlowiseCredentialSchema = {
  credentialName: string;
  label: string;
  inputs: Array<{
    name: string;
    label: string;
    type: string;
    required: boolean;
  }>;
};

export type FlowiseNodeDefinition = {
  name?: string;
  label?: string;
  credential?: {
    credentialNames?: string[];
    name?: string;
    optional?: boolean;
  };
};
