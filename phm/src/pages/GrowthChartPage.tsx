import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParentLayout } from '../components/ParentLayout';
import { WHOGrowthChart } from '../components/WHOGrowthChart';
import { dataService } from '../services/DataService';
import { TranslationService } from '../services/TranslationService';
import type { WHOGrowthPayload } from '../types/models';

type GrowthState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; payload: WHOGrowthPayload };

function GrowthChartContent({ state }: { state: GrowthState }) {
  if (state.kind === 'loading') {
    return <div className="max-w-[1200px] mx-auto p-8 text-center text-[#4c739a] dark:text-slate-400">{TranslationService.t('growth.loading')}</div>;
  }

  if (state.kind === 'error') {
    return <div className="max-w-[1200px] mx-auto p-8 text-center text-red-600 dark:text-red-400">{state.message}</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <WHOGrowthChart data={state.payload} />
    </div>
  );
}

export const GrowthChartPage: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const [state, setState] = useState<GrowthState>({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!childId) {
          setState({
            kind: 'error',
            message: TranslationService.t('common.error'),
          });
          return;
        }
        setState({ kind: 'loading' });
        const payload = await dataService.getWHOGrowthPayload(childId);
        if (!cancelled) {
          if (payload) {
            setState({ kind: 'ready', payload });
          } else {
            setState({
              kind: 'error',
              message: TranslationService.t('growth.noData'),
            });
          }
        }
      } catch (error: any) {
        if (!cancelled) {
          setState({
            kind: 'error',
            message: error?.message || TranslationService.t('growth.error'),
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [childId]);

  return (
    <ParentLayout activeNav="dashboard">
      <div className="max-w-[1200px] mx-auto p-8">
        <GrowthChartContent state={state} />
      </div>
    </ParentLayout>
  );
};
