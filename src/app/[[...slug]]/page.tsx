import { fetchPageData } from "@myvideo/api";
import { resolveViewModel } from "@myvideo/domain";
import ScreenRouter from "../screens/screen-router";

export default async function Page({ params }: { params: { slug?: string[] } }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug?.join("/") || "home";

    try {
        const data = await fetchPageData(slug);
        const viewModel = resolveViewModel(data);
        return <ScreenRouter viewModel={viewModel} />;
    } catch (error) {
        return <ScreenRouter viewModel={{ type: 'not_found' }} />;
    }
}