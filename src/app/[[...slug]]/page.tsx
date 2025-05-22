import { fetchPageData } from "@myvideo/api";
import { resolveViewModel } from "@myvideo/domain";
import ScreenRouter from "../screens/screen-router";

export default async function Page({
    params
}: {
    params: Promise<{ slug?: string[] }>
}) {
    // ✅ Await params ნექსთ 15 ში ასინქ არის 
    const resolvedParams = await params;
    const slug = resolvedParams.slug?.join("/") || "home";

    try {
        const data = await fetchPageData(slug);
        const viewModel = resolveViewModel(data);
        return <ScreenRouter viewModel={viewModel} />;
    } catch {
        return <ScreenRouter viewModel={{ type: 'not_found' }} />;
    }
}