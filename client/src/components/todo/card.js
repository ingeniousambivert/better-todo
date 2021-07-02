const style = {
  card: `relative flex flex-col border-2 border-gray-200 rounded-lg w-full`,
  cardBody: `p-5 flex flex-col`,
  cardTitle: `font-medium text-gray-800 mb-3`,
  cardFooter: `font-medium text-gray-800 mt-3`,
  cardText: `text-gray-600 h-28 overflow-y-scroll`,
};
const inlineStyle = {
  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
};
export function Card({ children }) {
  return (
    <div className={style.card} style={inlineStyle}>
      {children}
    </div>
  );
}
export function CardBody({ children, className }) {
  return <div className={`${style.cardBody} ${className}`}>{children}</div>;
}
export function CardTitle({ children, className }) {
  return <div className={`${style.cardTitle} ${className}`}>{children}</div>;
}
export function CardFooter({ children, className }) {
  return (
    <div className="border-t">
      <div className={`${style.cardFooter} ${className}`}>{children}</div>
    </div>
  );
}
export function CardText({ children, className }) {
  return <div className={`${style.cardText} ${className}`}>{children}</div>;
}
