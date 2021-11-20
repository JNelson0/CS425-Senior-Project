export const eventInclude = {
  userMemberships: {
    select: {
      userId: true,
      role: true,
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
  eventMemberships: {
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
