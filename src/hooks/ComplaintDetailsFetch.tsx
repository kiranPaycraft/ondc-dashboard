import { useState, useEffect } from "react";
import axios from "axios";
import { ComplaintListProps } from "../types/ComplaintProps";


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useComplaintDetailsListFetch = () => {
    const [data, setData] = useState<ComplaintListProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState<ComplaintListProps[]>([]);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitResponse, setSubmitResponse] = useState<any>(null);

useEffect(() => {
    const token = localStorage.getItem("token");
    let timestamp = new Date().getTime();
    axios.get(baseUrl + "OnIssue", {
        headers: {
            'client-type':  "2",
            'timestamp': `${timestamp}`,
            'signature':`jwt ${token}`,
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache, no-store',
            'Expires': '0'
        },
    })
        .then(response => {
            setData(response.data);
            setFilteredData(response.data);
            setLoading(false);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setSubmitError("You don't have privilege.");
            } else {
                console.error("Error fetching complaints:", error);
            }
            setLoading(false);
        });
}, []);

    const handleSearch = (query: string) => {
        setFilteredData(data.filter(item => item.issueId.toLowerCase().includes(query.toLowerCase())));
    };

    // Call /on_issue_status API on submit
    const handleSubmit = async (payload: any) => {
        setSubmitLoading(true);
        setSubmitError(null);
        console.log("Submitting issue status with payload:", payload);
        let data = {
            message: {
                category: payload.stage,
                issue_id: payload.issueId,
                short_desc: payload.shortDesc,
                long_desc: payload.description,
            }
        };
        try {
            const response = await axios.post(baseUrl + "on_issue_status", data);
            setSubmitResponse(response.data);
        } catch (error: any) {
            setSubmitError(error.message || "Error submitting issue status");
        } finally {
            setSubmitLoading(false);
        }
    };

    return { filteredData, loading, handleSearch, handleSubmit, submitLoading, submitError, submitResponse };
};

export default useComplaintDetailsListFetch;