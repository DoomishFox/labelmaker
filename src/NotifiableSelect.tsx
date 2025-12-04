interface NotifiableSelectProps<T> {
   bindTo: T
   property: string
   onNotify: (configuration: T) => void
   options: ReadonlyArray<string>
}

export const NotifiableSelect = <TConfig, TPropType>({ bindTo, property, onNotify, options }: NotifiableSelectProps<TConfig>) => {
   return (
      <select value={
         (bindTo as TConfig)[property as keyof TConfig] as string}
         onChange={(e) =>
            onNotify({
               ...bindTo,
               [property as keyof TConfig]: e.target.value as TPropType
            })
         }>
         {options.map((t) => <option value={t}>{t}</option>)}
      </select>
   )
}