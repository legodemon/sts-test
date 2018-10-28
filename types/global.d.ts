/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const styles: any
  export = styles;
}

declare module '*.scss' {
  const styles: any
  export = styles;
}

declare module '*.mp3' {
  const src: any
  export default src
}

declare module '*.wav' {
  const src: any
  export default src
}

declare module 'query-string' {
  const queryString: any
  export default queryString
}

declare module 'react-linkify' {
  const Linkify: any
  export default Linkify
}

declare module 'app/components/WebRTC/index' {
  const WebRTC: any
  export default WebRTC
}

declare module 'pretty-bytes' {
  const prettyBytes: any
  export = prettyBytes
}

declare module 'react-textarea-autosize' {
  const Textarea: {
    default: () => any
  }
  export = Textarea;
}

declare module 'inputmask' {
  const inputmask: any
  export = inputmask
}

declare module 'camelcase-keys' {
  const camelcaseKeys: {
    default: (input: any, options?: { exclude?: string[] | RegExp[], deep?: boolean }) => any
  }
  // function camelcaseKeys(input: any, options?: { exclude?: string[] | RegExp[], deep?: boolean }): any;
  export = camelcaseKeys
}

declare module 'react-dotdotdot' {
  const Dotdotdot: any
  export default Dotdotdot
}

declare var API_BUNDLE: string

declare enum ApplicationType {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  KOTZDOROV = 'kotzdorov',
  DOCDOC = 'docdoc'
}

declare var APP: ApplicationType

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;
