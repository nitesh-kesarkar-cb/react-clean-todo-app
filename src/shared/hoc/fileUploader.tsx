import { useState, useEffect } from 'react'

export function withFileUploader<
    TProps extends {
        onUploaded?: (url: string) => void
        onFileSelected?: (file: File | null) => void
    },
>(
    Wrapped: React.ComponentType<TProps>,
    uploadFn: (file: File) => Promise<string>
) {
    return function FileUploaderWrapper(
        props: Omit<TProps, 'onUploaded' | 'onFileSelected'> & {
            onUploaded?: (url: string) => void
        }
    ) {
        const [uploading, setUploading] = useState<boolean>(false)
        const [fileName, setFileName] = useState<string | null>(null)
        const [previewUrl, setPreviewUrl] = useState<string | null>(null)

        useEffect(() => {
            return () => {
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl)
                }
            }
        }, [previewUrl])

        async function handleFile(file?: File | null) {
            if (!file) return
            setFileName(file.name)
            try {
                const url = URL.createObjectURL(file)
                setPreviewUrl(url)
            } catch {
                setPreviewUrl(null)
            }

            setUploading(true)
            try {
                const uploadedUrl = await uploadFn(file)
                props.onUploaded?.(uploadedUrl)
            } catch (err) {
                console.error('Upload failed', err)
            } finally {
                setUploading(false)
            }
        }

        return (
            <div>
                <Wrapped {...(props as TProps)} onFileSelected={handleFile} />
                {fileName && (
                    <div className="text-sm mt-2">Selected: {fileName}</div>
                )}
                {uploading && <div className="text-sm mt-1">Uploading…</div>}
                {previewUrl && (
                    <div className="mt-2">
                        <img
                            src={previewUrl}
                            alt="preview"
                            className="w-28 h-28 object-cover rounded-md border"
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default function RawFileInput({
    onFileSelected,
}: {
    onFileSelected?: (file: File | null) => void
}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null
        onFileSelected?.(f)
    }

    return <input type="file" accept="image/*" onChange={handleChange} />
}
