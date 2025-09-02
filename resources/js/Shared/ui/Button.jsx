export default function Button({ as:Tag='a', href='#', children, variant='primary', className='', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl px-5 py-3 transition font-medium';
  const styles = {
    primary: 'bg-primary text-white hover:opacity-90',
    ghost: 'bg-ink/5 text-ink hover:bg-ink/10',
    outline: 'border border-ink/20 text-ink hover:bg-ink/5',
  }[variant] || '';
  return <Tag href={href} className={`${base} ${styles} ${className}`} {...props}>{children}</Tag>;
}
