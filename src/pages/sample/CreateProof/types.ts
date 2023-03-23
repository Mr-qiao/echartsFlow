export interface IStepProps {
  sampleInfo: Recordable<any>;
  proofInfo: Recordable<any>;
  onOk: (data: Recordable<any>) => Promise<void>;
}
