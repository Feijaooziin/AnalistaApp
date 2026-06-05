export function formatCpf(value: string) {
  const numbers = value.replace(/\D/g, "");

  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
}
