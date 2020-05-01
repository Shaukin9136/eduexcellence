

export const target_user = [
    {
        id: "Student",
        value: "Student"
    },
    {
        id: "Educator",
        value: "Educator"
    },
]

export const target_sub_user = [
    {
        id: "Academics",
        t_id: "Student",
        value: "Academics"
    },
    {
        id: "Skills",
        t_id: "Student",
        value: "Skills"
    },
    {
        id: "Owner Manager",
        t_id: "Educator",
        value: "Owner Manager"
    },
    {
        id: "Principal",
        t_id: "Educator",
        value: "Principal"
    },
    {
        id: "Teacher",
        t_id: "Educator",
        value: "Teacher"
    }
]

export const boards = [
    {
        id: "Boards",
        st_id: ["Owner Manager", "Principal"],
        value: "Boards - CBSC, IB, Cambridge"
    },
    {
        id: "CBSC",
        st_id: ["Teacher", "Academics"],
        value: "CBSC"
    },
    {
        id: "IB",
        st_id: ["Teacher", "Academics"],
        value: "IB"
    },
    {
        id: "Cambridge",
        st_id: ["Teacher", "Academics"],
        value: "Cambridge"
    },
    {
        id: "Resource Management",
        st_id: ["Owner Manager"],
        value: "Resource Management"
    },
    {
        id: "Leaders Skill Development",
        st_id: ["Principal"],
        value: "Leaders Skill Development"
    },
    {
        id: "Leadership styles",
        st_id: ["Principal"],
        value: "Leadership styles"
    },
    {
        id: "Safety",
        st_id: ["Principal"],
        value: "Safety"
    },
    {
        id: "Principals as Pedagogical Leaders",
        st_id: ["Principal"],
        value: "Principals as Pedagogical Leaders"
    },
    {
        id: "Stakeholders",
        st_id: ["Principal"],
        value: "Stakeholders"
    }
]

export const age_level = [
    {
        id: "Accrediation",
        b_id: ["Boards"],
        value: "Accrediation"
    },
    {
        id: "Curricular Policies",
        b_id: ["Boards"],
        value: "Curricular Policies"
    },
    {
        id: "Finances and Budgets",
        b_id: ["Resource Management"],
        value: "Finances and Budgets"
    },
    {
        id: "Human Resource",
        b_id: ["Resource Management"],
        value: "Human Resource"
    },
    {
        id: "Branding",
        b_id: ["Resource Management"],
        value: "Branding"
    },
    {
        id: "School Premises and Safety",
        b_id: ["Resource Management"],
        value: "School Premises and Safety"
    },
    {
        id: "Parents",
        b_id: ["Stakeholders"],
        value: "Parents"
    },
    {
        id: "Management",
        b_id: ["Stakeholders"],
        value: "Management"
    },
    {
        id: "Teacher",
        b_id: ["Stakeholders"],
        value: "Teacher"
    },
    {
        id: "5-7",
        b_id: ["CBSC", "IB", "Cambridge"],
        value: "5-7 Years"
    },
    {
        id: "8-11",
        b_id: ["CBSC", "IB", "Cambridge"],
        value: "8-11 Years"
    },
    {
        id: "11-14",
        b_id: ["CBSC", "IB", "Cambridge"],
        value: "11-14 Years"
    },
    {
        id: "14-15",
        b_id: ["CBSC", "IB", "Cambridge"],
        value: "14-15 Years"
    },
    {
        id: "16-17",
        b_id: ["CBSC", "IB", "Cambridge"],
        value: "16-17 Years"
    }
]

export const categories = [
    {
        id: "Teacher Recruitment",
        a_id: ["Teacher"],
        value: "Teacher Recruitment"
    },
    {
        id: "Teacher Training",
        a_id: ["Teacher"],
        value: "Teacher Training"
    },
    {
        id: "Teacher Appraisal",
        a_id: ["Teacher"],
        value: "Teacher Appraisal"
    },
    {
        id: "Skills",
        a_id: ["5-7", "8-11", "11-14", "14-15", "16-17"],
        value: "Skills"
    },
    {
        id: "Academics",
        a_id: ["5-7", "8-11", "11-14", "14-15", "16-17"],
        value: "Academics"
    }
] 

export const subcategories = [
    {
        id: "Maths",
        c_id: ["Academics"],
        value: "Maths"
    },
    {
        id: "Science",
        c_id: ["Academics"],
        value: "Science"
    },
    {
        id: "Social",
        c_id: ["Academics"],
        value: "Social"
    }
] 