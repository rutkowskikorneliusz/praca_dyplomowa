export const jobCategories = [
    {
        value: "",
    },
    {
        value: "JS",
    },
    {
        value: "HTML",
    },
    {
        value: "PHP",
    },
    {
        value: "Ruby",
    },
    {
        value: "Python",
    },
    {
        value: "Java",
    },
    {
        value: ".NET",
    },
    {
        value: "Scala",
    },
    {
        value: "C",
    },
    {
        value: "Mobile",
    },
    {
        value: "Testing",
    },
    {
        value: "DevOps",
    },
    {
        value: "Admin",
    },
    {
        value: "UX/UI",
    },
    {
        value: "PM",
    },
    {
        value: "Game",
    },
    {
        value: "Analytics",
    },
    {
        value: "Security",
    },
    {
        value: "Data",
    },
    {
        value: "Go",
    },
    {
        value: "Support",
    },
    {
        value: "ERP",
    },
    {
        value: "Architecture",
    },
    {
        value: "Inne",
    }
]

export const technologies = () => {
    return jobCategories.map(item => (
        {
            label: item.value,
            value: item.value
        }
    ))
}