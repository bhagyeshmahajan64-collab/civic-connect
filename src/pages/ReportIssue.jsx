import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Mic, MicOff, Sparkles, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { calculatePriority } from "../services/priorityEngine";
import { routeIssue } from "../services/routingEngine";
import { api } from "../services/api";

const categories = ["Pothole", "Garbage", "Streetlight", "Water Leakage", "Drainage", "Traffic Signal", "Public Space", "Other"];

export default function ReportIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ category: "", title: "", description: "", location: "", lat: null, lng: null, image: "" });
  const [listening, setListening] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const update = (key, value) => setForm(f => ({ ...f, [key]: value }));

  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation is not supported by this browser.");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setForm(f => ({ ...f, lat: coords.latitude, lng: coords.longitude, location: `Detected: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}` })),
      () => setForm(f => ({ ...f, location: "Mumbai, Maharashtra (demo location)" }))
    );
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice recognition is not supported. Use Chrome for the demo.");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => update("description", event.results[0][0].transcript);
    recognition.start();
  };

  const chooseImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("image", reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.description) return alert("Please select a category and add a description.");
    const priority = calculatePriority(form.description, form.category);
    const department = routeIssue(form.category);
    const issue = await api.createIssue({
      ...form,
      title: form.title || `${form.category} reported by citizen`,
      priority,
      department,
      assignedTo: "",
    });
    setSubmitted(issue);
  };

  if (submitted) {
    return <><Navbar/><main className="container page narrow">
      <div className="success-card">
        <div className="success-icon"><CheckCircle2 size={42}/></div>
        <div className="eyebrow">REPORT CONFIRMED</div>
        <h1>Issue submitted successfully!</h1>
        <p>Your report <b>{submitted.id}</b> has been sent to the municipal system.</p>
        <div className="analysis-box">
          <div><span>Category</span><b>{submitted.category}</b></div>
          <div><span>Priority</span><b className={`priority-text ${submitted.priority.toLowerCase()}`}>{submitted.priority}</b></div>
          <div><span>Department</span><b>{submitted.department}</b></div>
          <div><span>Location</span><b>{submitted.location || "Mumbai"}</b></div>
        </div>
        <div className="button-row"><button className="btn btn-primary" onClick={() => navigate(`/issue/${submitted.id}`)}>Track Report</button><button className="btn btn-outline" onClick={() => setSubmitted(null)}>Report Another</button></div>
      </div>
    </main></>;
  }

  const priority = calculatePriority(form.description, form.category);
  const department = routeIssue(form.category);

  return <><Navbar/><main className="container page narrow">
    <div className="page-heading"><div className="eyebrow">CITIZEN REPORTING</div><h1>Report a Civic Issue</h1><p>Capture the problem once. We'll help route it to the right team.</p></div>

    <form className="form-card" onSubmit={submit}>
      <div className="form-section"><h2>1. Issue details</h2>
        <label>Issue category<select value={form.category} onChange={e => update("category", e.target.value)}><option value="">Select category</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label>
        <label>Short title<input value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Large pothole near college gate"/></label>
        <label>Description<div className="textarea-wrap"><textarea value={form.description} onChange={e => update("description", e.target.value)} placeholder="Describe what is happening..."/><button type="button" className={`voice-button ${listening ? "listening" : ""}`} onClick={startVoice}>{listening ? <MicOff size={18}/> : <Mic size={18}/>} {listening ? "Listening..." : "Voice"}</button></div></label>
      </div>

      <div className="form-section"><h2>2. Evidence & location</h2>
        <label className="upload-box"><Camera size={25}/><b>Upload issue photo</b><small>JPG/PNG • Optional for demo</small><input type="file" accept="image/*" onChange={chooseImage}/>{form.image && <img src={form.image} alt="Issue preview"/>}</label>
        <div className="location-row"><div className="location-value"><MapPin size={19}/><span>{form.location || "Location not detected yet"}</span></div><button type="button" className="btn btn-outline" onClick={detectLocation}>Detect My Location</button></div>
      </div>

      <div className="form-section"><h2>3. Intelligent analysis</h2>
        <div className="analysis-box">
          <div><span><Sparkles size={15}/> Auto Priority</span><b className={`priority-text ${priority.toLowerCase()}`}>{form.description || form.category ? priority : "Pending input"}</b></div>
          <div><span>Department Routing</span><b>{form.category ? department : "Pending category"}</b></div>
        </div>
      </div>

      <button className="btn btn-primary btn-lg full" type="submit">Submit Civic Report</button>
    </form>
  </main></>;
}

