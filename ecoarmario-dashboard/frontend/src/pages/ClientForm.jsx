import React, { useState } from 'react';
import { submitClientForm } from '../services/api';
import { MapPin, Send, CheckCircle } from 'lucide-react';

const ClientForm = () => {
    const [formData, setFormData] = useState({
        nombre_completo: '',
        ci: '',
        telefono: '',
        ciudad: 'Santa Cruz',
        direccion: '',
        referencia: '',
        zona_entrega: 'Santa Cruz (Anillo 1-4)'
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitClientForm(formData);
            setSubmitted(true);
        } catch (error) {
            alert("Error al enviar. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
                <div className="bg-bg-secondary p-8 rounded-2xl border border-success/30 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 text-success">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">¡Datos Registrados!</h2>
                    <p className="text-text-secondary">Gracias por registrarte en EcoArmario. Ya puedes realizar tus compras.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-primary py-8 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-bg-secondary rounded-2xl shadow-xl border border-gray-800 p-6 md:p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1"><span className="text-success">Eco</span>Armario</h1>
                    <p className="text-text-secondary">Registro de Clientes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">Nombre Completo *</label>
                        <input
                            required name="nombre_completo" value={formData.nombre_completo} onChange={handleChange}
                            className="w-full bg-bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-success focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">Cédula (CI) *</label>
                            <input
                                required name="ci" value={formData.ci} onChange={handleChange}
                                className="w-full bg-bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-success focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-text-secondary mb-1">Celular/WhatsApp *</label>
                            <input
                                required name="telefono" value={formData.telefono} onChange={handleChange}
                                className="w-full bg-bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-success focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-text-secondary mb-1">Ciudad</label>
                        <select
                            name="ciudad" value={formData.ciudad} onChange={handleChange}
                            className="w-full bg-bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-success focus:outline-none"
                        >
                            <option>Santa Cruz</option>
                            <option>La Paz</option>
                            <option>Cochabamba</option>
                            <option>Tarija</option>
                            <option>Oruro</option>
                            <option>Potosí</option>
                            <option>Chuquisaca</option>
                            <option>Beni</option>
                            <option>Pando</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-text-secondary mb-1">Dirección Exacta</label>
                        <textarea
                            name="direccion" rows="2" value={formData.direccion} onChange={handleChange}
                            className="w-full bg-bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-success focus:outline-none"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm text-text-secondary mb-1">Zona de Entrega</label>
                        <select
                            name="zona_entrega" value={formData.zona_entrega} onChange={handleChange}
                            className="w-full bg-bg-primary border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-success focus:outline-none"
                        >
                            <option>Santa Cruz (Anillo 1-4)</option>
                            <option>Santa Cruz (Anillo 5-8)</option>
                            <option>Cotoca</option>
                            <option>Warnes</option>
                            <option>Envío Departamental</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        className="w-full py-2 bg-info/10 text-info border border-info/20 rounded-lg flex items-center justify-center gap-2 hover:bg-info/20 transition-colors"
                    >
                        <MapPin size={18} /> Obtener mi ubicación GPS
                    </button>

                    <button
                        type="submit" disabled={loading}
                        className="w-full py-3 bg-success hover:bg-success/90 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-success/20"
                    >
                        {loading ? 'Enviando...' : <><Send size={18} /> Confirmar Datos</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;
