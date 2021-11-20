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
