export type movieType = {
    id: string,
    title: string,
    category: string,
    likes: number,
    dislikes: number
}
export type likesRatioType = Pick<movieType, 'likes' | 'dislikes'>