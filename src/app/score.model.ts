export interface ScoreModel {
    scores: Score[]
}

export interface Score {
    team: string,
    record: string,
    points: number,
    percentage: string
}