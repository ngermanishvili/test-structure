const mockUsers = [
    {
        id: 'user1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/avatars/john.jpg',
        subscribedChannels: ['channel1', 'channel3'],
        watchHistory: ['1', '3', '5']
    },
    {
        id: 'user2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: '/avatars/jane.jpg',
        subscribedChannels: ['channel2', 'channel4'],
        watchHistory: ['2', '4', '6']
    }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUserProfile(userId: string = 'user1') {
    await delay(200);
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        subscribedChannels: user.subscribedChannels
    };
}