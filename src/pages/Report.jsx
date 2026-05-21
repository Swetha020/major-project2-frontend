import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import useLeadContext from "../context/LeadContext";
import useFetch from "../hooks/useFetch";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Report() {
  const { leads } = useLeadContext();

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const { data: agents } = useFetch("https://major-project2-backend-mu.vercel.app/agents");

  const agentNames = agents?.map((agent) => agent.name) || [];

  const agentLeadCount = leads.reduce((acc, lead) => {
    acc[lead.salesAgent?.name] = (acc[lead.salesAgent?.name] || 0) + 1;
    return acc;
  }, {});
  //   console.log(agentLeadCount);

  const agentCompletedCount = leads.reduce((acc, lead) => {
    if (lead.status == "Closed") {
      acc[lead.salesAgent.name] = (acc[lead.salesAgent.name] || 0) + 1;
    }
    return acc;
  }, {});
  //   console.log(agentCompletedCount);

  const totalCompletedCount = leads.reduce(
    (acc, lead) => (lead.status == "Closed" ? acc + 1 : acc),
    0,
  );
  const leadsInPipeline = leads.length - totalCompletedCount;

  const leadsData = {
    labels:statuses,
    datasets: [
      {
        label: "Lead Count",
        data: statuses.map((status) => statusCounts[status] || 0),
        backgroundColor: [
          "#5680ac",
          "#a9d4dd",
          "#83cd79",
          "#ece586",
          "#c6c6c6",
        ],
        hoverBackgroundColor: [
          "#0555a9",
          "#04b9dd",
          "#21cc0a",
          "#efe009",
          "#686767",
        ],
      },
    ],
  };

  const leadsOptions = {
    
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
        },
      },
    },
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Sales Agent Report",
      },
    },
  };

  const data = {
    labels: agentNames,
    datasets: [
      {
        label: "Total Leads",
        data: agentNames.map((label) => agentLeadCount[label] || 0),
        borderColor: "#08a185",
        backgroundColor: "#08a18585",
        barThickness: 30,
      },
      {
        label: "Leads Closed",
        data: agentNames.map((label) => agentCompletedCount[label] || 0),
        borderColor: "#35a2eb",
        backgroundColor: "#35a2eb80",
        barThickness: 30,
      },
    ],
  };

  const completedData = {
    labels: ["Complete", "In Pipeline"],
    datasets: [
      {
        label: "Lead Count",
        data: [totalCompletedCount, leadsInPipeline],
        backgroundColor: ["#c6c6c6", "#767676"],
      },
    ],
  };


  return (
    <>
      <h1 className="heading">CRM Reports</h1>

      <div className="chart-holder">
        <div className="row align-items-center">
          <div className="col-12 col-lg-4">
            <Doughnut data={completedData} options={leadsOptions} />
          </div>
          <div className="col-12 col-lg-8 d-flex flex-column justify-content-center">
            <h3 className="report-title">Leads closed and in Pipeline:</h3>
            <div className="report-pills">
              <p className="data-pill">
                Closed: {totalCompletedCount} (
                {((totalCompletedCount / leads.length) * 100).toFixed(1)}%)
              </p>

              <p className="data-pill">
                In Pipeline: {leadsInPipeline} (
                {((leadsInPipeline / leads.length) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bar-chart-holder">
          <h3 className="report-title text-center mb-4">
            {" "}
            Leads Closed by Sales Agent:
          </h3>
          <Bar options={options} data={data} />
        </div>
      </div>
      <div className="chart-holder ">
        <div className="row align-items-center">
          <div className="col-12 col-lg-4">
            <Pie data={leadsData} options={leadsOptions} />
          </div>
          <div className="col-12 col-lg-8 d-flex flex-column justify-content-center">
            <h3 className="report-title">Leads Status:</h3>
            <div className="report-pills">
              {statuses.map((status) => (
                <p className="data-pill">
                  {status}: {statusCounts[status] || 0}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h1></h1>
    </>
  );
}
