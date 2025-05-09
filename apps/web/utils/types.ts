export type Topics = {
    topicName: string,
    id: Number
}

export type Problem = {
    id: String
    title: string
    statement: string
    type: string
}

export type TestCase = {
    id: string,
    problemId: string,
    testCaseInput: string,
    testCaseOutput: string,
    explanation: string
}

export type Submsiions = {
    id: string,
    statement: string
    status: string,
    title: string,
    submissionType: string
    type: string,
    contest: string
}

export type DateType = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    seconds: number
}

export type Contest = {
    id: string,
    namen: string,
    starts: string
    ends: string
}

export type Profile = {
    user: {
        id: string,
        username: string,
        password: string,
        email: string
    },
    submissions: Submsiions[]
}