export interface Event {
    id: number;
    year: number;
    event: string;
}

export interface DateEntry {
    id: number;
    start: number;
    end: number;
    category: string;
    events: Event[];
}

export interface EventsData {
    dates: DateEntry[];
}
