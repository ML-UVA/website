'use client';
import { useEffect, useState } from "react";
import { getReadingSheetData } from "./getReadingSheetData";
import type { readingGroupRowData } from "./getReadingSheetData";
import "./ReadingGroups.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpinner from "@/components/custom/LoadingSpinner/LoadingSpinner";

function ReadingGroups() {
  const [rows, setRows] = useState<readingGroupRowData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReadingSheetData();
        setRows(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once after the component mounts.

  if (loading) return <LoadingSpinner />;
  if (!rows) return <div>No Data Available</div>;

  return (
    <section id="reading-groups" className="body page-section">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="section-heading text-uppercase">Reading Groups</h2>
        </div>
        <div className="description">
          <p className="lh justify-center pb-5 text-center">
            We host a weekly reading group where we discuss a
            fundamental/significant ML paper each week. Reading group is geared
            towards intermediates and advanced individuals. Reading group is
            highly discussion-based, and participants are expected to arrive
            having read (or attempted to read) the paper and with any questions
            they might have. Please check our Discord or Calendar for the
            up-to-date times and meeting locations.
          </p>
        </div>

        <div className="text-center mb-4">
          <h3 className="section-subheading text-muted">Papers covered by the reading group:</h3>
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="tableHeading">Paper</TableHead>
            <TableHead className="tableHeading">Presentor</TableHead>
            <TableHead className="tableHeading">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row.article}-${index}`} className="table-row-styles">
              <TableCell className="font-medium">
                <a href={row.link} className="paperStyle">
                  {row.article}
                </a>
              </TableCell>
              <TableCell className="font-medium">{row.presentedBy}</TableCell>
              <TableCell className="font-medium">
                {row.presentationDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </section>
  );
}

export default ReadingGroups;
