
import { DashboardTemplate } from './components/templates/DashboardTemplate';
import { SalesOverview } from './components/organisms/SalesOverview';
import { MOCK_SALES_DATA } from '../app/components/lib/constants';

export default function DashboardPage() {
  return (
    <DashboardTemplate title="Sales Dashboard">
      <SalesOverview salesData={MOCK_SALES_DATA} />
    </DashboardTemplate>
  );
}
