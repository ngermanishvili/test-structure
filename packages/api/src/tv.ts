const mockChannels = [
    { id: '1', name: 'TV პირველი', logo: 'TV', active: true, views: '30K', duration: '305', subscribers: '45' },
    { id: '2', name: 'იმედი 2', active: false },
    { id: '3', name: 'DISCOVER', active: false },
    { id: '4', name: 'GDS', active: false },
    { id: '5', name: 'კავკასია', active: false },
    { id: '6', name: 'აჭარა TV', active: false },
    { id: '7', name: 'ტელე', active: false },
    { id: '8', name: 'იმედი', active: false },
];

const mockNewBroadcasts = [
    { id: '1', title: 'სამაუწყებლო დასახელება', thumbnail: '/placeholder.svg?height=120&width=220', isLive: true },
    { id: '2', title: 'სამაუწყებლო დასახელება', thumbnail: '/placeholder.svg?height=120&width=220', isLive: false },
    { id: '3', title: 'სამაუწყებლო დასახელება', thumbnail: '/placeholder.svg?height=120&width=220', isLive: true },
    { id: '4', title: 'სამაუწყებლო დასახელება', thumbnail: '/placeholder.svg?height=120&width=220', isLive: false },
    { id: '5', title: 'სამაუწყებლო დასახელება', thumbnail: '/placeholder.svg?height=120&width=220', isLive: true },
];

const mockChannelVideos = [
    {
        id: '1',
        title: 'თამაშ გამოშვებაში ყველაზე ცუდი ბაზარი',
        thumbnail: '/placeholder.svg?height=120&width=220',
        duration: '3:40',
        views: '2,668 ნახვა',
        publishedAt: '20 საათის წინ'
    },
    {
        id: '2',
        title: 'მიშიკოს მაშველები საზღვარზე...',
        thumbnail: '/placeholder.svg?height=120&width=220',
        duration: '1:25',
        views: '5,669 ნახვა',
        publishedAt: '20 საათის წინ'
    },
    {
        id: '3',
        title: 'ვანოს შოუს სტუმარი იყვნენ ჟურნალისტები',
        thumbnail: '/placeholder.svg?height=120&width=220',
        duration: '26:36',
        views: '2,668 ნახვა',
        publishedAt: '20 საათის წინ'
    },
    {
        id: '4',
        title: 'ახალი ემსხვერპლნი! ბაზარზე - პატარია დიდი',
        thumbnail: '/placeholder.svg?height=120&width=220',
        duration: '7:25',
        views: '68 ნახვა',
        publishedAt: '95 წუთის წინ'
    },
    {
        id: '5',
        title: 'ახალი ემსხვერპლნი! ბაზარზე - პატარია დიდი',
        thumbnail: '/placeholder.svg?height=120&width=220',
        duration: '1:25',
        views: '68 ნახვა',
        publishedAt: '95 წუთის წინ'
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchTVHomeData() {
    await delay(200);

    return {
        type: 'home', 
        navigation: [
            { label: 'მთავარი', active: true },
            { label: 'სპორტი', href: '/sport', active: false },
            { label: 'კინო', active: false },
            { label: 'ჩვენი', active: false },
            { label: 'მოვლენები', active: false }
        ],
        heroSection: {
            channelInfo: mockChannels[0],
            liveInfo: {
                time: '11:58',
                date: '22/08',
                isLive: true
            },
            description: 'ტელეკომპანია პირველი გეგა ხვედელიძე მოსახლეობის სოციალური ფულის გადანაწილება არჩევნები ქართული ოცნება ფულის გადანაწილება. არჩევნები თბილისი არჩევნები.',
            backgroundImage: '/placeholder.svg?height=400&width=1200'
        },
        channels: mockChannels,
        newBroadcasts: mockNewBroadcasts,
        channelVideos: {
            channelName: 'TV პირველი',
            videos: mockChannelVideos
        }
    };
}