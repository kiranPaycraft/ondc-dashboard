export interface ComplaintListProps {
    id: number;
    title: string;
    description: string;
    category: string;
    issueId: string;
    stage: string;
    shortDesc: string;
}

export interface ComplaintEditProps {
    complaint: { id: number; title: string; status: string };
    onUpdate: (updatedComplaint: any) => void;
}