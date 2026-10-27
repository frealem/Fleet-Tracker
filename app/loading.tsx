import { LoadingPulse } from '@/components/loadingUI';

export default function Loading() {
  return <LoadingPulse text="Loading System Modules..." subText="Synchronizing driver telemetry data" />;
}