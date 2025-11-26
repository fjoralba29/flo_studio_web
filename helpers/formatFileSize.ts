export const formatFileSize = (bytes: number) => {
	if (bytes < 1024) return `${bytes} bytes`
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / 1048576).toFixed(1)} MB`
}
