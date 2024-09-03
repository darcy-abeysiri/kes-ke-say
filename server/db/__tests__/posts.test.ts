import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../server.ts'
import * as db from '../../index.ts'

vi.mock('')