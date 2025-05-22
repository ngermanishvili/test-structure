import { ViewModel } from "@myvideo/domain";
import HomeDashboard from "./home-dashboard";
import SportDashboard from "./sport-dashboard";
import NotFoundScreen from "./not-found";

import { Suspense } from 'react';


import type { HomeViewModel, SportViewModel, VideoViewModel } from '@myvideo/domain/src/types';

export default function ScreenRouter({ viewModel }: { viewModel: ViewModel }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {(() => {
                switch (viewModel.type) {
                    case "home":
                        return <HomeDashboard data={viewModel as HomeViewModel} />;
                    case "sport":
                        return <SportDashboard data={viewModel as SportViewModel} />;
                    default:
                        return <NotFoundScreen />;
                }
            })()}
        </Suspense>
    );
}