export const ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'] as const
export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'] as const

export const ALLOWED_FILE_TYPES = {
	image: { 'image/*': ALLOWED_IMAGE_EXTENSIONS },
	video: { 'video/mp4': ALLOWED_VIDEO_EXTENSIONS },
} as const
