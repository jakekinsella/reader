import { Constants } from 'central';

export const login = `${Constants.central.root}/login?redirect=${encodeURIComponent(Constants.reader.root)}`;
export const Colors = Constants.Colors;
