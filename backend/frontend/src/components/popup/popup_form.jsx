const Form = ({ submitHandler, setTitle, setDesc, setRating }) => {
  return (
    <form onSubmit={submitHandler}>
      <label>Title</label>
      <input
        placeholder="Write a title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Give us a description of this place."
      />
      <label>Rating</label>
      <select onChange={(e) => setRating(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button className="newPin__Button" type="submit">
        Add Pin
      </button>
    </form>
  );
};

export default Form;
