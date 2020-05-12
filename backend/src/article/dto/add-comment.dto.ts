export class AddArticleCommentDTO {
    readonly content: string;
    readonly article_id: number;
    readonly to_user_id: number;
}