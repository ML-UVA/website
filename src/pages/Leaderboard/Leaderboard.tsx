import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "@/utils/firebase";
import "@/css/parent.css";

//interfaces for the current structure of firebase database
interface CompetitionData {
  competition_id: number;
  function: Record<string, unknown>;
  url: string;
  name: string;
  description: string;
  competition_url: string;
}

interface SubmissionData {
  competition: number;
  computing_id: string;
  metrics: { [key: string]: number };
  name: string;
  score: number;
  time: number;
}

//conversion database to be passed into the leaderboard
interface Member {
  student_name: string;
  computing_id: string;
}

interface Submission {
  members: Member[];
  submission_time: number;
  link?: string;
  score: number;
  metrics: { [key: string]: number }; // define metrics as an object with string keys and number values
}

interface Competition {
  id: number;
  name: string;
  is_active: boolean;
  metric_names: Record<string, unknown>;
  submissions: Submission[];
  description: string;
  competition_url: string;
}

function Leaderboard() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        //retreive the competition list
        const comp_query = ref(db, "score_functions");
        onValue(comp_query, (snapshot) => {
          const data = snapshot.val();

          if (snapshot.exists() && data) {
            const comps: Competition[] = Object.values(
              data as Record<string, CompetitionData>
            ).map((competition) => {
              return {
                id: competition.competition_id,
                name: competition.name,
                is_active: true,
                metric_names: Object.fromEntries(
                  Object.entries(competition.function).filter(
                    ([, value]) => value !== 0
                  )
                ),
                url: competition.url,
                submissions: [],
                description: competition.description,
                competition_url: competition.competition_url,
              };
            });
            //retrieve all submissions
            const sub_query = ref(db, "submissions");
            onValue(sub_query, (snapshot) => {
              const data = snapshot.val();

              if (snapshot.exists() && data) {
                Object.values(data as Record<string, SubmissionData>).forEach(
                  (submission) => {
                    const matchingComp = comps.find(
                      (comp) => comp.id === submission.competition
                    );
                    if (matchingComp) {
                      matchingComp.submissions.push({
                        members: [
                          {
                            student_name: submission.name,
                            computing_id: submission.computing_id,
                          },
                        ],
                        submission_time: submission.time,
                        score: 1 / (submission.score + 0.00001),
                        metrics: submission.metrics,
                      });

                      matchingComp.submissions.sort(
                        (a, b) =>
                          b.score -
                          a.score +
                          0.0000001 * (a.submission_time - b.submission_time)
                      );
                    }
                  }
                );
              }
              setCompetitions(comps);
            });
          }
        });
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  //check if competition is active
  const toggleCollapse = (id: number) => {
    setCompetitions(
      competitions.map((comp) =>
        comp.id === id ? { ...comp, is_active: !comp.is_active } : comp
      )
    );
  };

  return (
    <div className="body">
      <div className="container">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            className={`competition ${comp.is_active ? "" : "collapsed"}`}
          >
            <div
              className="header mb-3"
              onClick={() => !comp.is_active && toggleCollapse(comp.id)}
            >
              <h3 className="h3">{comp.name}</h3>
              {!comp.is_active && (
                <button className="project-toggle-button">Toggle</button>
              )}
              <p>{comp.description}</p>
              <a href={comp.competition_url}>Compete here!</a>
            </div>
            {(comp.is_active || !comp.is_active) && (
              <table className="table">
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Submitter</th>
                    {/* {comp.metric_names ? (
                    Object.keys(comp.metric_names).map((key, idx) => (
                      <th key={idx}>{key}</th>
                    ))
                  ) : (
                    <div />
                  )} */}
                    <th>Score</th>
                    <th>Submission Time</th>
                    {/* <th>Profile</th> */}
                  </tr>
                </thead>
                <tbody>
                  {comp.submissions.map((submission, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index === 0
                            ? "gold"
                            : index === 1
                            ? "silver"
                            : index === 2
                            ? "#ff9350"
                            : "transparent",
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>
                        {submission.members
                          .map((member) => member.student_name)
                          .join(", ")}
                      </td>
                      {/* {Object.keys(comp.metric_names).map((key, idx) => (
                      <td key={idx}>{submission.metrics[key].toFixed(2)}</td>
                    ))} */}
                      <td>{submission.score.toFixed(3)}</td>
                      <td>
                        {new Date(
                          submission.submission_time * 1000
                        ).toLocaleString()}
                      </td>
                      {/* <td>
                      {submission.link ? (
                        <a
                          href={submission.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Profile
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
