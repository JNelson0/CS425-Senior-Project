import e from "express"

export const eventInclude = {
  userMemberships: {
    select: {
      userId: true,
      role: true,
    },
  },
  groupMemberships: {
    select: {
      groupId: true,
    },
  },
  exercises: {
    select: {
      id: true,
    },
  },
  exerciseResponses: {
    select: {
      id: true,
    },
  },
}

export const userMembershipInEventInclude = {
  event: {
    include: eventInclude,
  },
}

export const groupInclude = {
  userMemberships: {
    select: {
      userId: true,
      role: true,
    },
  },
}

export const userMembershipInGroupInclude = {
  group: {
    include: groupInclude,
  },
}

export const exerciseInclude = undefined

export const userInclude = {
  eventMemberships: {
    select: {eventId: true},
  },
  groupMemberships: {
    select: {groupId: true},
  },
  exerciseResponses: {
    select: {id: true},
  },
}

// const exersizeResponse = {
//   type: "WEIGHTS",
//   name: "Squats",
//   reps: 8,
//   sets: 5,
//   responses: {
//     [/* userId */ 1]: {
//       id: 1,
//       weights: [1, 2, 3, 4, 5],
//     },
//   },
// }

// const exercise = {
//   id: 1,
//   type: "WEIGHTS",
//   name: "Squats",
//   content: JSON.stringify({reps: 8, sets: 5}),
//   exerciseResponses: [
//     ({
//       id: 1,
//       exerciseId: 1,
//       eventId: 1,
//       userId: 1,
//       content: JSON.stringify({weights: [1, 2, 3, 4, 5]}),
//     },
//     {
//       id: 2,
//       content: JSON.stringify({weights: [1, 2, 3, 4, 5]}),
//       exerciseId: 1,
//       eventId: 1,
//       userId: 1,
//     }),
//   ],
// }
