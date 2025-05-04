import { MMKV } from '@/libs/mmkv';

import { StorageIds } from '@/types/enums/StorageIds';

export const AuthStorage = new MMKV({
  id: StorageIds.AUTH,
});
