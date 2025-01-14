export interface DeckDto {
    id: string;
    userId: number;
    title: string;
    status: DeckStatus;
    languageId: number;
    answerLanguageId?: number | null;
    audit: AuditDto;
    cards: CardDto[];
}

export interface CardDto {
    id: string;
    userId: number;
    languageId: number;
    phrase: string;
    answer: string;
    status: CardStatus;
    audit: AuditDto;
}

export interface AuditDto {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export enum DeckStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

export enum CardStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

export interface PageDto<T> {
    page: number;
    size: number;
    items: T[];
    totalCount: number;
    hasNext: boolean;
}
