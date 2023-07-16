const mapping: Record<string, string> = {
  files: 'file',
  'game-sections': 'game_section',
  servers: 'server',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
