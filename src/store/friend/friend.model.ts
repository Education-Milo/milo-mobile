export type FriendStatus = 'pending' | 'accepted' | 'blocked';
export type FriendDirection = 'sent' | 'received';


export interface Friend {
    id: number;
    userId: number;
    friendId: number;
    status: FriendStatus;
    createdAt: string;
    friend_last_name: string;
    friend_first_name: string;
    friend_email: string;
    direction: FriendDirection;
}