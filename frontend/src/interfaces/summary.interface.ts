export interface ISummary {
    ok:      boolean;
    summary: Summary;
}

export interface Summary {
    scheduled:   number;
    active:      number;
    finished:    number;
    activeToday: number;
}
