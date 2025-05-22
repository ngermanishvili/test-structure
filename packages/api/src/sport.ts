const mockSportChannels = [
    { id: '1', name: 'Sport TV', logo: 'ST', active: true },
    { id: '2', name: 'Arena Sport', logo: 'AS', active: false },
    { id: '3', name: 'Eurosport', logo: 'EU', active: false },
    { id: '4', name: 'ESPN', logo: 'ES', active: false },
];

const mockSportBroadcasts = [
    {
        id: '101',
        title: 'ლაივ ფეხბურთი - ჩემპიონთა ლიგა',
        thumbnail: '/placeholder.svg?height=250&width=220',
        isLive: true,
        views: '1.2K ნახვა',
        publishedAt: 'დღეს'
    },
    {
        id: '102',
        title: 'კალათბურთის მატჩის ძირითადი მომენტები',
        thumbnail: '/placeholder.svg?height=250&width=220',
        isLive: false,
        views: '850 ნახვა',
        publishedAt: 'გუშინ'
    },
    {
        id: '103',
        title: 'ტენისის ტურნირი - ფინალი',
        thumbnail: '/placeholder.svg?height=250&width=220',
        isLive: true,
        views: '2.1K ნახვა',
        publishedAt: 'დღეს'
    },
];

const mockSportVideos = [
    {
        id: '201',
        title: 'კვირის საუკეთესო გოლები',
        thumbnail: '/placeholder.svg?height=250&width=220',
        duration: '5:30',
        views: '2.5K ნახვა',
        publishedAt: '3 დღის წინ'
    },
    {
        id: '202',
        title: 'ყველაზე საინტერესო მატჩები',
        thumbnail: '/placeholder.svg?height=250&width=220',
        duration: '12:45',
        views: '1.8K ნახვა',
        publishedAt: '1 კვირის წინ'
    },
    {
        id: '203',
        title: 'სპორტული ინტერვიუები',
        thumbnail: '/placeholder.svg?height=250&width=220',
        duration: '8:20',
        views: '950 ნახვა',
        publishedAt: '2 დღის წინ'
    },
    {
        id: '204',
        title: 'ახალი სპორტული ამბები',
        thumbnail: '/placeholder.svg?height=250&width=220',
        duration: '3:15',
        views: '1.2K ნახვა',
        publishedAt: '5 დღის წინ'
    },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchSportData() {
    await delay(200);

    const result = {
        type: 'sport',
        navigation: [
            { label: 'მთავარი', href: '/', active: false },
            { label: 'ტელევიზია', href: '/tv', active: false },
            { label: 'სპორტი', href: '/sport', active: true },
            { label: 'კინო', href: '/movies', active: false },
            { label: 'მუსიკა', href: '/music', active: false },
        ],
        heroSection: {
            title: 'სპორტული არხები',
            subtitle: 'უყურეთ ყველაზე საინტერესო სპორტულ შეჯიბრებებს',
            backgroundImage: '/placeholder.svg?height=400&width=1200',
            backgroundColor: '#1e40af'
        },
        channels: mockSportChannels,
        newBroadcasts: mockSportBroadcasts,
        channelVideos: {
            channelName: 'Sport TV',
            videos: mockSportVideos
        }
    };

    console.log('fetchSportData result:', result);
    return result;
}