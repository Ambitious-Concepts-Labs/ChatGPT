import { eachDayOfInterval, format, isEqual, setHours, toDate } from "date-fns";

export const titles = ["", "Free", "Personal", "Professional"];

export const data = [
  {
    title: "Monthly Tokens",
    free: "10 000",
    presonal: "300 000",
    professional: "1 000 000",
  },
  {
    title: "Tokens to words",
    free: "2500",
    presonal: "75 000",
    professional: "250 000",
  },
  {
    title: "Long-Form Assistant",
    free: "Yes",
    presonal: "Yes",
    professional: "Yes",
  },
  {
    title: "Language Detection",
    free: "Yes",
    presonal: "Yes",
    professional: "Yes",
  },
  {
    title: "Headline Generator",
    free: "Yes",
    presonal: "Yes",
    professional: "Yes",
  },
  {
    title: "Intro Generator",
    free: "Yes",
    presonal: "Yes",
    professional: "Yes",
  },
  {
    title: "Grammarly Integration",
    free: "Yes",
    presonal: "Yes",
    professional: "Yes",
  },
  {
    title: "Article Export",
    free: "Yes",
    presonal: "Yes",
    professional: "Yes",
  },
  {
    title: "Project Folders",
    free: "Unlimited",
    presonal: "Unlimited",
    professional: "Unlimited",
  },
  {
    title: "Support",
    free: "Chat",
    presonal: "Chat",
    professional: "Chat",
  },
];

const startDate = "2023-07-09";
const endDate = "2023-08-09";
const nonEmptyDay = "2023-07-13";
const value = 52;
const formatString = "MMM d";

const dates = eachDayOfInterval({
  start: new Date(startDate),
  end: new Date(endDate),
});

const getFormattedDates = () => {
  const toCompare = toDate(setHours(new Date(nonEmptyDay), 0));
  const result = dates.map((date, i) => {
    if (isEqual(date, toCompare)) {
      return {
        x: format(date, formatString),
        y: value,
      };
    } else {
      return {
        x: format(date, formatString),
        y: 0,
      };
    }
  });

  return result;
};

export default getFormattedDates;
