import { ViewModel } from "@myvideo/domain";
import HomeDashboard from "./home-dashboard";
import VideosScreen from "./videos-screen";
import NotFoundScreen from "./not-found";
import { Suspense } from 'react';
import type { HomeViewModel, VideosViewModel } from '@myvideo/domain/src/types'; // ✅ Add VideosViewModel

export default function ScreenRouter({ viewModel }: { viewModel: ViewModel }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {(() => {
                switch (viewModel.type) {
                    case "home":
                        return <HomeDashboard data={viewModel as HomeViewModel} />;
                    case "videos":
                        return <VideosScreen data={viewModel as VideosViewModel} />;
                    default:
                        return <NotFoundScreen />;
                }
            })()}
        </Suspense>
    );
}