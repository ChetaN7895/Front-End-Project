
import { DashboardTemplate } from './components/templates/DashboardTemplate';
import { SalesOverview } from './components/organisms/SalesOverview';
import { MOCK_SALES_DATA } from './components//lib/constants';

export default function DashboardPage() {
  return (
    <DashboardTemplate title="Sales Dashboard">
      <div className="p-6">
        <SalesOverview salesData={MOCK_SALES_DATA} />
      </div>
    </DashboardTemplate>
  );
}
