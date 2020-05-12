export class UpdateArticleDTO {
    readonly article_id: number;
    readonly title: string;
    readonly content: string;
    readonly img: string;
    readonly verify_code: number;
}