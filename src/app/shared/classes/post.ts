export interface Post {
    id?: number,
    slug?: string;
    title?: string,
    author?: string,
    date?: string,
    content?: string,
    comments?: number,
    type?: string
    blog_categories: Array<{
        name: string;
        slug: string;
    }>
    image: any
}