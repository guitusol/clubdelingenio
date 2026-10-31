import os
import sys
from fpdf import FPDF
from fpdf.enums import XPos, YPos

class PDFEstatutos(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        
        fonts_dir = r"C:\Windows\Fonts"
        self.add_font("CustomFont", "", os.path.join(fonts_dir, "arial.ttf"))
        self.add_font("CustomFont", "B", os.path.join(fonts_dir, "arialbd.ttf"))
        self.add_font("CustomFont", "I", os.path.join(fonts_dir, "ariali.ttf"))
        if os.path.exists(os.path.join(fonts_dir, "arialbi.ttf")):
            self.add_font("CustomFont", "BI", os.path.join(fonts_dir, "arialbi.ttf"))

    def header(self):
        logo_path = r"C:\laragon\www\clubdelingenio\club_ingenio_logo.jpg"
        if os.path.exists(logo_path):
            try:
                self.image(logo_path, 15, 11, 20)
            except Exception:
                pass
        
        self.set_xy(38, 12)
        self.set_font("CustomFont", "B", 8)
        self.set_text_color(180, 83, 9)  # Áureo noble
        self.cell(0, 4, "REGISTRO DE ASOCIACIONES | LEY ORGÁNICA 1/2002 DEL DERECHO DE ASOCIACIÓN", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        self.set_xy(38, 17)
        self.set_font("CustomFont", "B", 12.5)
        self.set_text_color(15, 23, 42)  # Azul noche
        self.cell(0, 5.5, "ESTATUTOS OFICIALES DE LA ASOCIACIÓN «CLUB DEL INGENIO»", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        self.set_xy(38, 23.5)
        self.set_font("CustomFont", "I", 8.8)
        self.set_text_color(100, 116, 139)
        self.cell(0, 4, "Para la Estimulación Cognitiva, la Lógica y los Deportes de la Mente (Valencia)", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        
        # Línea separadora dorada
        self.set_draw_color(217, 119, 6)
        self.set_line_width(0.7)
        self.line(15, 31, 195, 31)
        self.set_y(34)

    def footer(self):
        self.set_y(-18)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.4)
        self.line(15, self.get_y(), 195, self.get_y())
        
        self.set_y(-14)
        self.set_font("CustomFont", "", 8)
        self.set_text_color(100, 116, 139)
        self.cell(140, 5, "Asociación Club del Ingenio - D. Guillermo Tudela Soler (Valencia) | Estatutos Oficiales", align="L")
        self.cell(40, 5, f"Página {self.page_no()}/{{nb}}", align="R")

    def chapter_title(self, label):
        self.ln(2)
        self.set_fill_color(248, 250, 252)
        self.set_text_color(15, 23, 42)
        self.set_font("CustomFont", "B", 9.8)
        self.set_draw_color(203, 213, 225)
        self.set_line_width(0.3)
        self.cell(0, 6.8, f"  {label.upper()}", new_x=XPos.LMARGIN, new_y=YPos.NEXT, fill=True, border="B")
        self.ln(2)

    def article_title(self, label):
        self.set_font("CustomFont", "B", 9)
        self.set_text_color(30, 41, 59)
        self.cell(0, 4.8, label, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.ln(0.5)

    def body_p(self, text):
        self.set_font("CustomFont", "", 8.5)
        self.set_text_color(30, 41, 59)
        self.multi_cell(0, 4.1, text, align="J")
        self.ln(1.5)

def build_pdf():
    pdf = PDFEstatutos()
    pdf.set_margins(15, 12, 15)
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # Preámbulo
    pdf.body_p(
        "Los presentes Estatutos regulan la organización y funcionamiento de la «ASOCIACIÓN CLUB DEL INGENIO "
        "PARA LA ESTIMULACIÓN COGNITIVA Y LOS DEPORTES DE LA MENTE», entidad sin ánimo de lucro constituida "
        "al amparo del artículo 22 de la Constitución Española, la Ley Orgánica 1/2002, de 22 de marzo, reguladora "
        "del Derecho de Asociación (LODA) y la Ley 14/2008 de Asociaciones de la Comunitat Valenciana."
    )

    # CAPÍTULO I
    pdf.chapter_title("Capítulo I. Denominación, Fines, Domicilio y Ámbito Territorial")

    pdf.article_title("Artículo 1. Denominación y Naturaleza Jurídica")
    pdf.body_p(
        "Con la denominación «ASOCIACIÓN CLUB DEL INGENIO PARA LA ESTIMULACIÓN COGNITIVA Y LOS DEPORTES DE LA MENTE» "
        "(en adelante, la Asociación), se constituye una entidad asociativa privada sin fin de lucro, dotada de personalidad "
        "jurídica propia y plena capacidad de obrar para el cumplimiento de sus fines."
    )

    pdf.article_title("Artículo 2. Fines Fundacionales")
    pdf.body_p(
        "Constituyen los fines fundamentales de la Asociación:\n"
        "1. Fomento y difusión del pensamiento analítico, la lógica matemática y los deportes de la mente (sudokus de alta deducción, "
        "cálculo mental táctico, léxico y palabras cruzadas, bridge, criptografía, puzzles panorámicos, cubo 3D y juegos de tablero estratégico).\n"
        "2. Promoción de la estimulación cognitiva y el envejecimiento activo: desarrollo de actividades y plataformas orientadas al "
        "mantenimiento de la agilidad mental, la memoria operativa y la reserva cognitiva, prestando especial atención a la juventud "
        "y de forma prioritaria a las personas mayores y categoría máster (65+).\n"
        "3. Defensa de un software lúdico ético (Manifiesto Zero-Ads): fomento de plataformas informáticas de acceso limpio, "
        "libres de anuncios invasivos, libres de apuestas lucrativas (gambling) y respetuosas con la privacidad del usuario (Zero-Login).\n"
        "4. Generación de comunidad y fomento del Juego Limpio (Fair Play): impulso de torneos, campeonatos y duelos en estricta igualdad matemática."
    )

    pdf.article_title("Artículo 3. Actividades Previstas")
    pdf.body_p(
        "Para la consecución de sus fines, la entidad desarrollará las siguientes actividades:\n"
        "• Administración, ampliación y difusión pública de la plataforma web telemática oficial https://clubdelingenio.com y sus módulos lúdicos.\n"
        "• Organización periódica de torneos, certámenes presenciales y online, y publicación del Cuadro de Honor (Salón de la Fama).\n"
        "• Impartición de talleres, conferencias, seminarios y divulgación pedagógica sobre estimulación cerebral y gimnasia mental.\n"
        "• Formalización de convenios de colaboración con colegios, universidades, residencias de mayores, clubes sociales y entidades afines."
    )

    pdf.article_title("Artículo 4. Domicilio Social y Ámbito Territorial")
    pdf.body_p(
        "1. El domicilio social de la Asociación se fija en la ciudad de Valencia (Comunidad Valenciana, España).\n"
        "2. El ámbito territorial de actuación es autonómico y nacional, extendiendo su proyección al ámbito internacional a través "
        "de las herramientas y aplicaciones telemáticas multilingües de la plataforma."
    )

    # CAPÍTULO II
    pdf.chapter_title("Capítulo II. Los Asociados: Requisitos, Derechos, Deberes y Régimen Disciplinario")

    pdf.article_title("Artículo 5. Adquisición de la Condición de Asociado")
    pdf.body_p(
        "Podrán ser miembros de la Asociación todas aquellas personas físicas mayores de edad, o menores con autorización, "
        "con capacidad de obrar e interés acreditado en los fines asociativos. Se reconocen las categorías de: Socios Fundadores, "
        "Socios de Número y Socios de Honor (aquellos distinguidos por su aportación notable al desarrollo del ingenio y las ciencias lógicas)."
    )

    pdf.article_title("Artículo 6. Derechos de los Asociados")
    pdf.body_p(
        "Los miembros gozan de los siguientes derechos:\n"
        "a) Participar activamente en las actividades organizadas y en los órganos de gobierno conforme a los Estatutos.\n"
        "b) Ejercer el derecho de sufragio activo y pasivo (voz y voto) en las Asambleas Generales.\n"
        "c) Ser informados sobre la composición de los órganos directivos, el estado financiero y la memoria anual de actividades.\n"
        "d) Utilizar los recursos, servicios telemáticos y distintivos oficiales del Club en los términos reglamentarios."
    )

    pdf.article_title("Artículo 7. Deberes de los Asociados")
    pdf.body_p(
        "Son obligaciones de los socios:\n"
        "a) Compartir y respaldar activamente los fines fundacionales de la Asociación.\n"
        "b) Cumplir los presentes Estatutos y los acuerdos válidamente adoptados por la Asamblea y la Junta Directiva.\n"
        "c) Abonar puntualmente las cuotas periódicas o derramas fijadas por la Asamblea General.\n"
        "d) Guardar las normas éticas de respeto mutuo, juego limpio y honorabilidad asociativa."
    )

    pdf.article_title("Artículo 8. Pérdida de la Condición de Socio")
    pdf.body_p(
        "La condición de miembro se pierde por renuncia voluntaria comunicada por escrito, por fallecimiento, por impago "
        "reiterado de cuotas tras requerimiento formal, o por sanción de expulsión acordada mediante expediente disciplinario "
        "contradictorio en caso de conducta gravemente lesiva para los fines o el prestigio del Club."
    )

    # CAPÍTULO III
    pdf.chapter_title("Capítulo III. Órganos de Gobierno, Administración y Representación")

    pdf.article_title("Artículo 9. Órganos Directivos")
    pdf.body_p(
        "El gobierno y representación de la Asociación se estructura en: la Asamblea General de Socios (órgano soberano supremo) "
        "y la Junta Directiva (órgano colegiado ejecutivo de gestión y administración permanente)."
    )

    pdf.article_title("Artículo 10. La Asamblea General")
    pdf.body_p(
        "1. La Asamblea General está compuesta por todos los asociados de pleno derecho.\n"
        "2. Se reunirá con carácter ordinario al menos una vez al año dentro de los seis primeros meses del ejercicio para examinar "
        "y aprobar la memoria de actividades, las cuentas del ejercicio cerrado y el presupuesto del año siguiente.\n"
        "3. Se reunirá con carácter extraordinario por convocatoria de la Presidencia, de la Junta Directiva o a solicitud de al menos un 10% de los socios.\n"
        "4. Los acuerdos se adoptan por mayoría simple de presentes o representados, exigiéndose mayoría cualificada de dos tercios (2/3) "
        "para la modificación de estatutos, elección de Junta Directiva, federación con otras entidades o disolución."
    )

    pdf.article_title("Artículo 11. La Junta Directiva")
    pdf.body_p(
        "1. La Junta Directiva estará integrada por: Presidente/a, Vicepresidente/a, Secretario/a, Tesorero/a y Vocales.\n"
        "2. Los cargos tendrán un mandato de cuatro (4) años con posibilidad de reelección, y se desempeñarán de forma altruista y gratuita.\n"
        "3. El Presidente ostenta la representación legal, judicial e institucional de la entidad (siendo Presidente Fundador Don Guillermo Tudela Soler)."
    )

    # CAPÍTULO IV
    pdf.chapter_title("Capítulo IV. Régimen Económico, Financiero y Patrimonial")

    pdf.article_title("Artículo 12. Patrimonio y Recursos Económicos")
    pdf.body_p(
        "1. La Asociación se funda sin patrimonio fundacional dinerario previo, aportando los fundadores los derechos de uso y "
        "gestión telemática de la plataforma clubdelingenio.com y sus activos informáticos.\n"
        "2. Los recursos de la entidad provendrán de las cuotas de socios, donaciones o subvenciones públicas y privadas, "
        "así como de posibles ingresos por actividades o publicaciones pedagógicas, aplicándose íntegramente a los fines estatutarios.\n"
        "3. El ejercicio económico coincide con el año natural, concluyendo a 31 de diciembre."
    )

    # CAPÍTULO V
    pdf.chapter_title("Capítulo V. Disolución, Liquidación y Destino del Patrimonio")

    pdf.article_title("Artículo 13. Disolución y Liquidación")
    pdf.body_p(
        "La Asociación se disolverá por voluntad de los socios adoptada en Asamblea General Extraordinaria con la mayoría "
        "de dos tercios (2/3), o por causas legales o sentencia judicial. En caso de disolución, la Junta Directiva actuará "
        "como comisión liquidadora para satisfacer deudas pendientes. El patrimonio neto sobrante, en ningún caso podrá ser "
        "distribuido entre los socios, debiendo ser donado íntegramente a una entidad no lucrativa benéfica o educativa de "
        "naturaleza análoga dedicada a la infancia o al bienestar de los mayores."
    )

    # BLOQUE DE FIRMA Y DILIGENCIA
    pdf.ln(3)
    pdf.set_draw_color(203, 213, 225)
    pdf.set_line_width(0.4)
    pdf.line(15, pdf.get_y(), 195, pdf.get_y())
    pdf.ln(4)

    pdf.set_font("CustomFont", "B", 9)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(110, 5, "DILIGENCIA DE APROBACIÓN FUNDACIONAL:", new_x=XPos.RIGHT, new_y=YPos.TOP)
    pdf.cell(70, 5, "REGISTRO DE ASOCIACIONES:", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")

    pdf.ln(2)
    pdf.set_font("CustomFont", "B", 10.5)
    pdf.cell(110, 5, "Don Guillermo Tudela Soler", new_x=XPos.RIGHT, new_y=YPos.TOP)
    
    pdf.set_font("CustomFont", "I", 8)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(70, 5, "[ Espacio reservado para diligencia registral ]", new_x=XPos.LMARGIN, new_y=YPos.NEXT, align="R")

    pdf.set_font("CustomFont", "", 8.8)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(110, 4.5, "Presidente Fundador", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(110, 4.5, "Asociación «Club del Ingenio»", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    pdf.cell(110, 4.5, "Valencia (España), a 31 de octubre de 2026", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    output_path = r"C:\laragon\www\clubdelingenio\estatutos_asociacion_club_del_ingenio.pdf"
    pdf.output(output_path)
    print(f"PDF de Estatutos generado exitosamente en: {output_path}")

if __name__ == "__main__":
    build_pdf()
