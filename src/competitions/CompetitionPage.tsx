import React, { useEffect, useState } from "react";
import { Button, Input, Text, useToast } from "@chakra-ui/react";
import { db } from "../firebaseConfig";
import { ref, onValue, push } from "firebase/database";

type Competition = {
    competitionName: string;
    // description: string;
    startDate: string;
    endDate: string;
};

type ComeptitionSchema = {
    competitionId: string;
    competitionName: string;
    // description: string;
    startDate: string;
    endDate: string;
};

function CompetitionPage() {
    // =========== constants ===========
    const toast = useToast({
        duration: 3000,
        isClosable: true,
        position: "top",
    });
    const competitionRef = ref(db, "competitions");
    // =========== states ===========
    // for all competitions
    const [competitions, setCompetitions] = useState<any[]>([]);

    // for adding a competition
    const [competitionName, setCompetitionName] = useState<string>("");
    const [competitionDate, setCompetitionDate] = useState<string>("");
    // =========== functions ===========

    const addCompetition = async () => {
        try {
            if (!competitionName || !competitionDate) {
                toast({
                    title: "Please fill in all fields",
                    status: "error",
                });
            }
            const [year, month, day] = competitionDate.split("-");
            const endDate = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day),
                0,
                0,
                0,
                0
            );
            console.log("endDate", endDate);
            await push(competitionRef, {
                competitionName,
                startDate: new Date().getTime(),
                endDate: endDate.getTime(),
            }).then(() => {
                toast({
                    title: "Competition added",
                    status: "success",
                });
            });
        } catch (e) {
            toast({
                title: "Failed to add competition",
                status: "error",
            });
        }
    };

    // =========== effects ===========
    useEffect(() => {
        onValue(competitionRef, (snapshot) => {
            const data = snapshot.val();
            console.log("data", data);
            let allCompetitions: ComeptitionSchema[] = [];
            Object.keys(data).map((key) => {
                const { competitionName, startDate, endDate } = data[key];
                allCompetitions.push({
                    competitionId: key,
                    competitionName,
                    startDate,
                    endDate,
                });
            });
            setCompetitions(allCompetitions);
        });
    }, []);

    return (
        <div>
            Competitions
            <ModifiedInput
                type="text"
                placeholder="Enter competition name"
                value={competitionName}
                onChange={setCompetitionName}
            />
            <ModifiedInput
                type="date"
                placeholder="Enter a date"
                value={competitionDate}
                onChange={setCompetitionDate}
            />
            <Button
                onClick={() => {
                    addCompetition();
                }}
            >
                Add competition
            </Button>
            {competitions?.map((competition) => {
                const { competitionName, startDate, endDate } = competition;
                return (
                    <>
                        <br />
                        <br />
                        Competition Name: {competitionName}
                        <br />
                        Start Date: {startDate}
                        <br />
                        End Date: {endDate}
                        <br />
                    </>
                );
            })}
        </div>
    );
}

export default CompetitionPage;

function ModifiedInput({
    type,
    value,
    placeholder,
    onChange,
}: {
    type: string;
    value: any;
    placeholder: string;
    onChange: (value: any) => void;
}) {
    return (
        <>
            {/* <Text>{placeholder}:</Text> */}
            <Input
                type={type}
                value={value}
                placeholder={placeholder ? placeholder : ""}
                margin={5}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
    );
}
